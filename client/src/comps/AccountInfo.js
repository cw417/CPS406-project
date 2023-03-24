import Bank from "../objects/Bank"
import { useState, useEffect } from 'react'

export default function AccountInfo(props) {
    const accountId = props.accountId
    const bank = new Bank()
    const [account, setAccount] = useState(null)

    useEffect(() => {
        getAccountInfo(accountId)
    }, [])

    async function getAccountInfo(accountId) {
        bank.getAccount(accountId).then((data) => setAccount(data))
    }

    if (account === null){
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }

    return(
        <>
            <p>AccountInfo</p>
            <p>{account.accountBalance}</p>
        </>
    )
}