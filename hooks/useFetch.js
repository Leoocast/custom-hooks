import React, { useState, useEffect,useRef } from 'react'
import { useNewState } from '../hooks/customSetState'

export const useFetch = url => {

    const isMounted = useRef(true)

    const [state, setState] = useNewState({
        data: null,
        loading: true,
        error: null,
    })

    useEffect(()=> {
        return () => {
            isMounted.current = false
        }
    }, [])

    useEffect(() => {

        setState({loading: true})  

        fetch(url).then(res => res.json()).then(data => {

            setTimeout(() => {
                
                if(isMounted.current) 
                    setState(
                    {
                        data: data,
                        loading: false,
                        error: null,
                    })  
                    else
                console.log("Se previno el setState")
            }, 4000)
        })

    }, [url])

    return [state]
}
