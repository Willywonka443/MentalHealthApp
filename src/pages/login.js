import { TextField } from '@mui/material';
import React from 'react'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';




const Login = ({restId, setRestId}) => {
    const navigate = useNavigate()
    const goToHome = (id) => {
        setRestId(id)
        navigate("/basepage")
      }
    return (
        <>
            <html>

            <body class="login">

                <center><p class="login">

                    <center><h1>Welcome {restId} </h1></center>
                    
                    <div>

                    </div>
                    
                    <form>
                    <TextField id="standard-basic" label="Username:" variant="standard" />
                        <div>
                            <br>
                            </br>
                        </div>
                    <TextField id="standard-basic" label="Password:" type="password" variant="standard" />
                        <div>
                            <br>
                            </br>
                        </div>
                        <Button size="small" onClick={(e) => goToHome()}>Login</Button>
                        <div>
                            <br>
                            </br>
                        </div>

                        <Button  variant="text" >Create Account</Button>
                    </form>

                </p>

                </center>

            </body>

            </html>

        </>
    )
}
export default Login

