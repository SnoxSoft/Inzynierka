﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pirsoft.Api.DatabaseManagement.CrudHandlers;
using Pirsoft.Api.Enums;
using Pirsoft.Api.Models;
using Pirsoft.Api.Models.ModelCreators;

namespace Pirsoft.Api.Controllers;

[ApiController]
public class AbsenceController : ControllerBase
{
    private readonly ICrudHandler _crudHandler;
    
    public AbsenceController(ICrudHandler crudHandler) => _crudHandler = crudHandler;
    
    [Authorize]
    [HttpGet("get/absence/statuses")]
    public async Task<IEnumerable<AbsenceStatusModel>> GetListOfAllAbsenceStatuses()
    {
        var query = await _crudHandler.ReadAllAsync<AbsenceStatusModel>();
        return await query.OrderBy(absenceStatus => absenceStatus.absence_status_id).ToListAsync();
    }
    
    [Authorize]
    [HttpGet("get/absence/types")]
    public async Task<IEnumerable<AbsenceTypeModel>> GetListOfAllAbsenceTypes()
    {
        var query = await _crudHandler.ReadAllAsync<AbsenceTypeModel>();
        return await query.OrderBy(absenceType => absenceType.absence_type_id).ToListAsync();
    }
    
    [Authorize]
    [HttpPost("create/new/absence")]
    public async Task<IActionResult> CreateNewAbsence(DateTime absenceStartDate, DateTime absenceEndDate, 
        sbyte unpaid, int absenceTypeId, int employeeApproverId, int employeeOwnerId, int absenceStatusId)
    {
        var existingEmployee = await _crudHandler.ReadAsync<EmployeeModel>(employeeOwnerId);

        if (existingEmployee != null)
        {
            int actualLeaveDays = existingEmployee.leave_base_days;
            int actualDemandDays = existingEmployee.leave_demand_days;

            // Obliczenie dni nieobecności
            int countedDuration = 0;

            for (var day = absenceStartDate.Date; day.Date <= absenceEndDate.Date; day = day.AddDays(1))
            {
                if (day.DayOfWeek != DayOfWeek.Saturday && day.DayOfWeek != DayOfWeek.Sunday)
                {
                    countedDuration += 1;
                }
            }
            
            // Jeżeli unpaid to nie zabiermy dni z urlopu pracownika
            // Jeżeli typ na żądanie to zabieramy z dni na żądanie i z dni urlopowych, jeżeli nie zostało wybrane unpaid
            var query = await _crudHandler.ReadAllAsync<AbsenceTypeModel>();
            var getAbsenceCategory = query.First(absenceType => absenceType.absence_type_id == absenceTypeId);
            bool isDemand = getAbsenceCategory.absence_type_category == "demand";
            bool isADayOff = getAbsenceCategory.absence_type_category == "dayoff";
            bool isAOccasional = getAbsenceCategory.absence_type_category == "occasional";
            bool isAbsent = getAbsenceCategory.absence_type_category == "absent";
            bool isSick = getAbsenceCategory.absence_type_category == "sick";

            int newLeaveDays = !isAbsent && !isSick && !isAOccasional && ((isADayOff && unpaid == 0) || (isDemand && unpaid == 0)) ? actualLeaveDays - countedDuration : actualLeaveDays;
            int newDemandDays = isDemand ? actualDemandDays - countedDuration : actualDemandDays;

            Console.WriteLine(newLeaveDays);
            Console.WriteLine(newDemandDays);
            if (newLeaveDays >= 0 && newDemandDays >= 0)
            {
                existingEmployee.leave_base_days = newLeaveDays;
                existingEmployee.leave_demand_days = newDemandDays;

                AbsenceModel newAbsence = (AbsenceModel)new AbsenceCreator(absenceStartDate, absenceEndDate, unpaid,
                    absenceTypeId, employeeApproverId, employeeOwnerId, absenceStatusId, ((isADayOff && unpaid == 0) || (isDemand && unpaid == 0)) ? countedDuration : 0).CreateModel();

                await _crudHandler.CreateAsync(newAbsence);
                await _crudHandler.UpdateAsync(existingEmployee);
                //_crudHandler.PushChangesToDatabase();
                return Ok();
            }
            else
            {
                return Problem();
            }
        }
        else
        {
            return NotFound();
        }
    }
    
    [Authorize]
    [HttpPut("edit/absence/{id}")]
    public async Task<IActionResult> UpdateAbsence(int id, int employeeApproverId, int absenceStatusId, DateTime? endDateTime)
    {
        var existingAbsence = await _crudHandler.ReadAsync<AbsenceModel>(id);
        if (existingAbsence == null)
            return NotFound();
        
        existingAbsence.employee_approver_id = employeeApproverId;
        existingAbsence.absence_status_id = absenceStatusId;

        try
        {
            var query = await _crudHandler.ReadAllAsync<AbsenceTypeModel>();
            var getAbsenceCategory = query.First(absenceType => absenceType.absence_type_id == existingAbsence.absence_type_id);
            if (absenceStatusId is 2 or 3 && (existingAbsence.duration > 0 || 
                                              (existingAbsence.duration == 0 && getAbsenceCategory.absence_type_category == "demand") || endDateTime != null))
            {
                var existingEmployee = await _crudHandler.ReadAsync<EmployeeModel>(existingAbsence.employee_owner_id);
                if (existingEmployee != null)
                {
                    int actualLeaveDays = existingEmployee.leave_base_days;
                    int actualDemandDays = existingEmployee.leave_demand_days;
                    
                    bool leaveDaysChanged = false;
                    if (getAbsenceCategory.absence_type_category == "dayoff"  || 
                        (getAbsenceCategory.absence_type_category == "demand" && existingAbsence.unpaid == 0) || endDateTime != null)
                    {
                        int durationOfAbsence = existingAbsence.duration;
                        int returnedDays = 0;
                        if (endDateTime != null)
                        {
                            // Zmniajszamy dni i zapisujemy krótszy urlop jesli dni pobrane są > 0
                            for (var day = existingAbsence.absence_start_date; day.Date <= existingAbsence.absence_end_date; day = day.AddDays(1))
                            {
                                if (day > DateTime.Today && existingAbsence.duration > 0 && day.DayOfWeek != DayOfWeek.Saturday && day.DayOfWeek != DayOfWeek.Sunday)
                                {
                                    returnedDays += 1;
                                }
                            }
                            durationOfAbsence -= returnedDays;
                            existingAbsence.absence_end_date = (DateTime)endDateTime;
                        }
                        if(absenceStatusId is 2){
                            actualLeaveDays += durationOfAbsence;
                        }
                        if(absenceStatusId is 3 && endDateTime != null){
                            actualLeaveDays += returnedDays;
                        }

                        leaveDaysChanged = actualLeaveDays != existingEmployee.leave_base_days;
                        existingEmployee.leave_base_days = actualLeaveDays;
                        
                    }

                    bool demandDaysChanged = false;
                    if (getAbsenceCategory.absence_type_category == "demand")
                    {
                        actualDemandDays += 1;
                        demandDaysChanged = actualDemandDays != existingEmployee.leave_demand_days;
                        existingEmployee.leave_demand_days = actualDemandDays;
                    }

                    if (leaveDaysChanged || demandDaysChanged)
                    {
                       await _crudHandler.UpdateAsync(existingEmployee);
                    }
                }
            }

            await _crudHandler.UpdateAsync(existingAbsence);
            return Ok();
        }
        catch (DbUpdateConcurrencyException)
        {
            return Conflict();
        }
    }
    
    [Authorize]
    [HttpDelete("delete/absence/{id}")]
    public async Task<IActionResult> DeleteAbsenceById(int id)
    {
        // Check if the absence exists
        var absence = await _crudHandler.ReadAsync<AbsenceModel>(id);
        if (absence == null)
            return NotFound();
        
        //Sprawdzenie czy nieobecnosc jest odrzucona, jeśli odrzucona to usuwamy, 
        // jeśli nieobecność w stanie oczekująca to zwracamy dni urlopowe
        try
        {
            var query = await _crudHandler.ReadAllAsync<AbsenceTypeModel>();
            var getAbsenceCategory = query.First(absenceType => absenceType.absence_type_id == absence.absence_type_id);
            if (absence.absence_status_id is 1 or 3 && (absence.duration > 0 || 
                                                        (absence.duration == 0 && getAbsenceCategory.absence_type_category == "demand")))
            {
                var existingEmployee = await _crudHandler.ReadAsync<EmployeeModel>(absence.employee_owner_id);
                if (existingEmployee != null)
                {
                    int actualLeaveDays = existingEmployee.leave_base_days;
                    int actualDemandDays = existingEmployee.leave_demand_days;
                    
                    bool leaveDaysChanged = false;
                    if (getAbsenceCategory.absence_type_category == "dayoff"  || 
                        (getAbsenceCategory.absence_type_category == "demand" && absence.unpaid == 0))
                    {
                        actualLeaveDays += absence.duration;
                        leaveDaysChanged = actualLeaveDays != existingEmployee.leave_base_days;
                        existingEmployee.leave_base_days = actualLeaveDays;
                        
                    }

                    bool demandDaysChanged = false;
                    if (getAbsenceCategory.absence_type_category == "demand")
                    {
                        actualDemandDays += 1;
                        demandDaysChanged = actualDemandDays != existingEmployee.leave_demand_days;
                        existingEmployee.leave_demand_days = actualDemandDays;
                    }
                    if (leaveDaysChanged || demandDaysChanged)
                    {
                        await _crudHandler.UpdateAsync(existingEmployee);
                    }

                }
            }
            await _crudHandler.DeleteAsync(absence);
            return Ok();
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [Authorize]
    [HttpGet("get/employee/absences/{id}/{dateFrom}/{dateTo}")]
    public async Task<IEnumerable<AbsenceModel>> GetEmployeeAbsences(int id, DateTime dateFrom, DateTime dateTo)
    {
        var query = await _crudHandler.ReadAllAsync<AbsenceModel>();
        return query.AsQueryable().Where(absence => absence.employee_owner_id == id).
            Where(absence => absence.absence_start_date <= dateTo && absence.absence_end_date>=dateFrom).ToList();
        
    }
    
    [Authorize]
    [HttpGet("get/all/employee/absences/{dateFrom}/{dateTo}")]
    public async Task<IEnumerable<AbsenceModel>> GetAllEmployeeAbsences(DateTime dateFrom, DateTime dateTo)
    {
        var query = await _crudHandler.ReadAllAsync<AbsenceModel>();
        return query.AsQueryable().
            Where(absence => absence.absence_start_date <= dateTo && absence.absence_end_date>=dateFrom).ToList();
        
    }
}