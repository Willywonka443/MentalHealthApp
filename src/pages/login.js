import { TextField, Card, CardContent } from '@mui/material';
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

                <center>

                    <center><h1>Welcome {restId} </h1></center>
                    
                    <div>

                    </div>
                    <Card sx={{ width: 275 }}><CardContent>
                    <form>
                    <TextField id="username" label="Username:" variant="standard" />
                        <div>
                            <br>
                            </br>
                        </div>
                    <TextField id="password" label="Password:" type="password" variant="standard" />
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
                    </CardContent></Card>

                </center>



        </>
    )
}
export default Login

