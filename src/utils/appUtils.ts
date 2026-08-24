
export function truncateText(text, maxLength) {
    if (!text || text.length <= maxLength) return text;
    // Cut to the max length
    let trimmed = text.slice(0, maxLength);
    // Find the last space within that trim
    const lastSpace = trimmed.lastIndexOf(' ');
    // Use that last full word if possible
    if (lastSpace > 0) {
        trimmed = trimmed.slice(0, lastSpace);
    }
    return trimmed + '...';
}




export function setLocalStorageUtils(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function manageStringConvertionUtils(value: any) {
    if (value && !value.includes(' ')) {
        value += ' ';
    }
    return value;
}
export function getLocalStorageUtils(key: string) {
    let jsonString = localStorage.getItem(key);
    if (jsonString && jsonString != "undefined") {
        return JSON.parse(jsonString);
    }
    return null;
}
export function getDateTimeDifferenceInSecondsUtils(startDateTime: any, endDateTime: any) {
    if (startDateTime && endDateTime) {
        return Math.floor((endDateTime - startDateTime) / 1000);
    }
    return 0;
}

export function getSecondsInTimeFormatUtils(numberOfSeconds: number) {
    let hours = Math.floor(numberOfSeconds / 3600); // 3600 seconds in an hour
    let minutes = Math.floor((numberOfSeconds % 3600) / 60); // Remaining minutes
    let seconds = numberOfSeconds % 60; // Remaining seconds

    // Format the time in h:m:s
    // return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    let formattedDuration = '';
    if (hours > 0) {
        formattedDuration += `${hours} hrs `;
    }
    if (minutes > 0) {
        formattedDuration += `${minutes} min `;
    }
    if (seconds > 0 || (hours === 0 && minutes === 0)) {
        formattedDuration += `${seconds} sec`; // Always show seconds if no hours or minutes
    }

    // Trim any extra space from the end
    formattedDuration = formattedDuration.trim();
    return formattedDuration;
}

export async function sleepForSecondsUtils(secondsToSleep = 1) {
    return await new Promise((resolve) => setTimeout(resolve, secondsToSleep * 1000));
}


export function scrollToDivUtil(divId: string, offSet = 80) {
    const tryScroll = () => {
        const element = document.getElementById(divId);
        let retryCount = 0;
        if (element && retryCount < 2) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offSet,
                behavior: 'smooth',
            });
        } else {
            retryCount++;
            setTimeout(tryScroll, 500);
        }
    };

    tryScroll();
}

export function validateFormFields(formRef: any) {
    const newErrors: { [key: string]: string } = {};
    if (formRef) {
        // Check if form is valid using checkValidity()
        const isFormValid = formRef.checkValidity();

        if (!isFormValid) {
            // Loop through each field to validate and display error messages
            const elements = formRef.elements as HTMLFormControlsCollection;
            Array.from(elements).forEach((element) => {
                if (
                    element instanceof HTMLInputElement ||
                    element instanceof HTMLTextAreaElement ||
                    element instanceof HTMLSelectElement
                ) {
                    if (!element.validity.valid) {
                        newErrors[element.name || element.id] = `${element.name || element.id
                            } is required`;
                    }
                }
            });


        }
        return { newErrors, isFormValid };
    }
};


