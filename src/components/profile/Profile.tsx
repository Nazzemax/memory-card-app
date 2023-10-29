import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks/hooks"
import { RootState } from "../../app/store"
import { selectUser } from "../../features/auth/AuthSlice"
import Loader from "../utils/loader"

const Profile:React.FC  = ()=> {

 const isAuthenticated = useAppSelector((state:RootState) => state.auth.isAuthenticated)
 
 const user = useAppSelector(selectUser)

 const isLoading = useAppSelector(state => state.auth.isLoading)

  return (
    <>{!isAuthenticated ? <Navigate to='/' /> : isLoading ? <Loader /> : (
        <div>
              <div>User</div>
        <div>
           <ul>
               <li>{user.name}</li>
               <li>{user.email}</li>
           </ul>
        </div>
        </div>
    )
    }
       
    </>
    )
}

export default Profile