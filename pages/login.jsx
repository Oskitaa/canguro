import {log, auth} from '/firebase/client'
import { useRouter } from "next/router"


export default function Login(){
    const router = useRouter()
    const onSubmit = (e) => {
        
        e.preventDefault()
        const { email, password} = e.target
        log(email.value,password.value)
        router.push("/")
    }

    return(
        <>
            <h1>Estas en singup</h1>
            <form onSubmit={onSubmit}>
                <input type="text" name="email"/>
                <input type="password" name="password"/>
                <button type="submit">Enviar</button>
            </form>
            <button onClick={()=>console.log(auth.currentUser)}>Clic</button>
        </>
    )
}