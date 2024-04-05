import { IBlogItems, IToken, IUserData, IUserInfo } from "@/Interfaces/Interfaces"
import { headers } from "next/headers"


// ashurblogproject.database.windows.net
//http://localhost:5244/swagger/index.html
// const url = "https//myblogapi.azurewebsites.net"
const url = "http://localhost:5244"

let userData: IUserData


export const createAccount = async (createdUser: IUserInfo) => {
    //we're using this fetch to make a POST Request
    //We have to set the method to POST
    //we set the content type to application/ json to specify our json data format
    const res = await fetch(url + '/User/AddUser', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(createdUser)

    })
    //we need to check if our post was succesful

    if(!res.ok){
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }

    const data = await res.json();
    console.log(data);
}

export const login = async (LoginUser: IUserInfo) => {
    const res = await fetch( url + "/User/Login", {
        method: "POST",
        headers: {
            'Content-Type':  "application/json"
        },
        body: JSON.stringify(LoginUser)
    });
    if(!res.ok){
        const message = "An Error has occured " + res.status;
        throw new Error(message);
    }

    const data: IToken = await res.json();
    return data;
}

export const getLoggedInUserData = async (username: string) => {
    const res = await fetch(url + '/User/GetUserByUsername/' + username);
    const data = await res.json();
    userData = data;
}

export const loggedinData = () => {
    return userData;
}

//this function helps to see if our user is logged in
export const checkToken = () => {
    let result = false;

    let IsData = localStorage.getItem("Token");

    if (IsData !=null){
        result = true
    }
    return result
}

// dashboard fetches
export const getBlogItemsByUserId = async (userId: number) => {
    const res = await fetch(url + '/Blog/GetItemsByUserId/' + userId);
    const data = await res.json();
    return data;
}

export const addBlogItem = async (Blog:IBlogItems) => {
    const res = await fetch(url + '/Blog/AddBlogItem', {
        method: "POST",
        headers:  {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(Blog)
    });
    if(!res.ok){
        const message = "An Error has Occured " + res.status;
        throw new Error(message);
    }

    //Returns a boolean value depending on whether or not we added a blog item succesfully
    const data = await res.json();
    return data;

}

export const updateBlogItem = async (Blog:IBlogItems) => {
    const res = await fetch(url + '/Blog/UpdateBlogItem', {
        method: "PUT",
        headers:  {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(Blog)
    });
    if(!res.ok){
        const message = "An Error has Occured " + res.status;
        throw new Error(message);
    }

    //Returns a boolean value depending on whether or not we added a blog item succesfully
    const data = await res.json();
    return data;
}

export const getAllBlogItems = async () => {
    const res = await fetch (url + '/Blog/GetAllBlogItems');
    const data = await res.json();
    return data;
}