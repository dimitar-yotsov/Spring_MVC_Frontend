import fetch from 'unfetch';

/*

Method to check if the response from the server contains error to handle

*/

const checkStatus = (response) => {
    if(response.ok) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        response.json().then(e => {
            error.error = e;
        });
        return Promise.reject(error);
    }
}

/*

Method to access all the students from the DB

*/

export const getAllStudents = () => fetch("api/students").then(checkStatus);


/*

Method to add a new student to the DB

*/
export const addNewStudent = student =>
    fetch("api/students", {
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        method: "POST",
        body: JSON.stringify(student)
    }).then(checkStatus);
