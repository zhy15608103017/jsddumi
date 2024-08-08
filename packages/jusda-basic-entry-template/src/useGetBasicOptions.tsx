import React, { useEffect, useState } from "react"
import { uniformRequest } from "./service"
import { useGetBasicOptionsProps } from "./type";



const useGetBasicOptions = (props: useGetBasicOptionsProps) => {
    const { type, keyword, page } = props;
    const [totalPage, setTotalPage] = useState(0)
    const [options, setOptions] = useState<{ value: string, label: string }[]>([])
    const [loading, setLoading] = useState(true)

    const initBasicOptions =
        async () => {
            setLoading(true)
            const response = await uniformRequest({
                type,
                keyword,
                page
            })
            if (page < response.totalPages) {
                setOptions(options.concat(response.countriesArr))
            }
            // setOptions(response.countriesArr)
            setTotalPage(response.totalPages)
            setLoading(false)


        }

    useEffect(() => {
        initBasicOptions()
    }, [type, keyword, page])


    return { options, loading, totalPage }
}
export default useGetBasicOptions