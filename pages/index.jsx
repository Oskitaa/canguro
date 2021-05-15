import Nav from '/components/nav'
import Bottom from '/components/bottom'
import useUser from '/hooks/useUser'
import {auth} from '/firebase/client'
export default function Home(){
    
    const user = useUser()
    
    return(
        <html>
            <Nav/>
            <Bottom/>
            <button onClick={()=>{console.log(auth.currentUser);}}>User</button>
            <button onClick={()=>{auth.signOut()}}>SingOut</button>
            <style jsx>{`
                html{
                    height:200vh;
                }
            `}</style>
            
        </html>
        
    )
}