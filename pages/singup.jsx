import {singup} from '/firebase/client'
import { useRouter } from "next/router"


export default function Singup(){
    const router = useRouter()
    const onSubmit = (e) => {
        
        e.preventDefault()
        const { email, password, name} = e.target
        singup(email.value,password.value,name.value)
        router.push("/")
    }

    return(
        <>
            <h1>Estas en login</h1>
            <form onSubmit={onSubmit}>
                <input type="text" name="email"/>
                <input type="password" name="password"/>
                <input type="text" name="name"/>
                <button type="submit">Registrar</button>
            </form>
        </>
    )
}