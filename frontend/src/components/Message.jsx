
export function Message ({sender,content,timestamp}){

    const formattedTime = timestamp ? new Date (timestamp).toTimeString([],
        {
            hour: "2-digit",
            minute: "2-digit"
        })
        : "";


    return (
        <div>
            <strong>
                {sender}
            </strong>

            <p>
                {content}
            </p>
        </div>
    );
}
