import { useLayoutEffect } from 'react';
import useUser , { USER_STATES } from '/hooks/useUser'
import { useRouter } from "next/router";


export default function Perfil(){
    const user = useUser()
    const router = useRouter()

    useLayoutEffect(() => {
        user && router.push("/");
    }, [])

    console.log("user", user)
    return(
        <>  {user &&(
            <h1>Estas en el perfil de {user.displayName}</h1>
            )}
        </>
    )
}