# otpapp/utils.py or views.py



def send_otp_sms(to_number, otp,name):
    

    message = {
        "body":f"Wellcom to PJ MONEY POWER {name}  and Your OTP code is: {otp}",
        
        "to":to_number
    }

    return message