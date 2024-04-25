import React, { forwardRef } from 'react'
import './style.css'

const Input = forwardRef((props,ref) =>{

    const {title,placeholder,type,value,isErrorMessage,buttonTitle,message,onChange,onKeydown,onButtonClick} = props;
    
    const buttonClass = value === '' ? 'input-box-button-disable' : 'input-box-button';
    const messageClass = isErrorMessage ? 'input-box-message-error' : 'input-box-message';

    return(
        <div className='input-box'>
            <div className='input-box-title'>{title}</div>
            <div className='input-box-content'>
                <div className='input-box-body'>
                    <input className='input-box-input' ref={ref} placeholder={placeholder} type={type} value={value} onChange={onChange} onKeyDown={onKeydown} ></input>
                    {buttonTitle !== undefined && onButtonClick !== undefined && <div className={buttonClass} onClick={onButtonClick}>{buttonTitle}</div>}
                </div>
                
                {message !== undefined && <div className={messageClass}>{message}</div>}
            </div>
            
            
        </div>
    );


});

export default Input