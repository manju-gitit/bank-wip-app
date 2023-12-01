import React from 'react'
import Card from '../UserContext' 
//import auth from '../auth'
import { initializeApp } from "firebase/app";
import { signInWithPopup,getAuth,GoogleAuthProvider } from "firebase/auth";

function Login({setIsAuth}) {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    
  const [googleSignin, setGoogleSignin] = React.useState(false);
      // Initialize Firebase
	const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
	const provider = new GoogleAuthProvider();

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
 
  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

function handleLoginWithEmailAndPassword(){
    const url = `/account/login/${email}/${password}`;
    fetch(url)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
}

//const Navigate = useNavigate() ;
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then((result) =>  {
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", JSON.stringify(result.user.displayName));
      localStorage.setItem("photoURL", JSON.stringify(result.user.photoURL));
      //Navigate("/");

    }) 
    .catch((error) => {
      console.error("Error signing in wih Google: ", error);
    });

    const userName = "User";
};

return (<>
    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handleLoginWithEmailAndPassword}>Login</button> 

    <button id="googlelogin" onClick={handleGoogleLogin}>Google Login</button>  

  </>);
}}

export default Login