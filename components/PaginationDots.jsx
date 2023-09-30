import React from 'react'
import { View } from 'react-native'

export const PaginationDots = ({ totalPages, currentPage }) => {
    console.log(totalPages, currentPage);
    return (
        <View className="flex flex-row items-center justify-center mt-2">
            {Array.from({ length: totalPages }, (_, index) => {
                const selected = currentPage == index + 1
                return (
                    <View style={{
                        width: 8,
                        height: 8, 
                        borderRadius: 5, 
                        backgroundColor: selected ? 'white' : 'gray',
                        margin: 3, 
                    }}></View>
                )
            })}
        </View>
    )
}
