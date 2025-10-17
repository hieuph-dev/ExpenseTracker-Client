import React, { useEffect, useState } from 'react'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareExpenseBarChartData } from '../../utils/helper'

const Last30DaysExpenses = ({ data }) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        console.log('Raw data received:', data) // data goc
        const result = prepareExpenseBarChartData(data)
        console.log('Prepared chart data:', result) // data đã xử lý
        setChartData(result)

        return () => {}
    }, [data])

    return (
        <div className='card col-span-1'>
            <div className='flex items-center justify-between '>
                <h5 className='text-lg'>Last 30 Days Expenses</h5>
            </div>

            <CustomBarChart data={chartData} XAxisKey='category' />
        </div>
    )
}

export default Last30DaysExpenses
