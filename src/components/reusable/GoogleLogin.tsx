import React from 'react';
import { toast } from '../ui/toast';
import { useGoogleLogin } from '@/hooks/auth.hooks';
import { GoogleLogin } from "@react-oauth/google"

const GoogleLoginComponent = () => {
      const { mutate: googleLogin, isPending: googlePending } = useGoogleLogin()
        const handleGoogleSuccess = (credentialResponse: {
        credential?: string
    }) => {

        if (!credentialResponse.credential) {
            toast.add({
                title: " Login Failed",
                description: "Something went wrong",
                type: "error"
            })
            return
        }

        const idToken = credentialResponse.credential
        const payload = {
            idToken
        }

        googleLogin(payload, {
            onSuccess: (res) => {
                console.log(res);
                toast.add({
                    title: " Login Success",
                    description: res.data.message ?? "User logged in successful",
                    type: "success"
                })

                

            },

            onError: (err) => {
                toast.add({
                    title: " Login Failed",
                    description: err.message ?? "Something went wrong",
                    type: "error"
                })
            }

        })

    }


    const handleGoogleError = () => {
        toast.add({
            title: "Google Login Failed",
            description: "Something went wrong",
            type: "error"
        })
    }
    return (
        <div>
                 <GoogleLogin text="continue_with" onSuccess={handleGoogleSuccess} onError={handleGoogleError}></GoogleLogin>
        </div>
    );
};

export default GoogleLoginComponent;