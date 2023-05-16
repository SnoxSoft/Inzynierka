const TIME_TO_EXPIRY = 1000*60*5; //ms*s*m

export function getLocalStorageKeyWithExpiry(key) {
    const localStr = localStorage.getItem(key)

    if(!localStr)
    {
        return null
    }

    const localStrJson = JSON.parse(localStr);

    const currentDate = new Date().getTime();

    if(currentDate > localStrJson.expiry)
    {
        localStorage.removeItem(key);
        window.location.reload();
        return null;
    }

    const updateKey = {
        value: localStrJson.value,
        expiry: currentDate+TIME_TO_EXPIRY,
    }
    localStorage.setItem(key, JSON.stringify(updateKey));

    return localStrJson.value;
}

export function setLocalStorageKeyWithExpiryKey(key, value)
{
    const currentDate = new Date();

    const item = {
        value: value,
        expiry: currentDate,
    }
    localStorage.setItem(key, JSON.stringify(item))
}