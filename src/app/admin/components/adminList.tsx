'use client'

import Loader from "@/components/ui/loader"
import { IListItem } from "@/interfaces/admin.interface"
import { FC } from "react"
import AdminListItem from "./adminListItem"

interface IAdminList {
    listItems?: IListItem[]
    isLoading: boolean

    removeHandler?: (id: number) => void
}

const AdminList: FC<IAdminList> = ({ isLoading, removeHandler, listItems = [] }) => {
    return (
        <div className="my-2">           
            {isLoading ? (<Loader />) : listItems.length ? (
                listItems.map(listItem => (
                    <AdminListItem
                        key={listItem.id}
                        removeHandler={
                            removeHandler ? () => removeHandler(listItem.id) :
                                undefined
                        }
                        listItem={listItem}
                    />
                ))
            ) : (
                <div>Новая музыка не найдена!</div>
            )}
        </div>
    )
}

export default AdminList