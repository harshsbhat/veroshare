"use client"
import { useUserData } from "@/hooks/useUserData"


export default function Dashboard(){
    const { id, email, loading: userDataLoading, error: userDataError } = useUserData();
    return(
        <div>Hello {email}</div>
    )
}