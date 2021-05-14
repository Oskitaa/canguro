import Link from 'next/link'
import useUser, { USER_STATES } from "/hooks/useUser"


export default function Nav(){
    const user = useUser()

    return(
        <>
            <h1>NAV</h1>
            {user === USER_STATES.NOT_LOGGED && (
            <ul>
                <li>
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </li>
                <li>
                    <Link href="/singup">
                        <a>SingUp</a>
                    </Link>
                </li>
            </ul>
            )}
            {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
            <style jsx>{`

                h1{
                    text-align:center;
                    border: 1px solid red;
                  
                    width:100%;
                    margin-top:0;
                }

                li{
                    display:inline-block;
                }

            `}</style>
        </>
    )
}