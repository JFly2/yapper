import {useState} from "react";
import "../styles/MessageInput.css";

export function MessageInput({sendMessage}){
    const [inputText, setInputText] = useState("");


    function handleSendMessage(){
        if (!inputText.trim()){
            return;
        }

        sendMessage(inputText);
        setInputText("");
    }

    return (
        <>

        <div className={"message-input-container"}>
            <input
                className={"message-input"}
                type={"text"}
                placeholder={"Send message"}
                size="30"
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleSendMessage();
                    }
                }}
            />
            <button className={"send-button"}
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
            >send
            </button>


            </div>
        </>
    );
}
