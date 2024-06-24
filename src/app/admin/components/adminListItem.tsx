'use client'

import { IAdminListItem } from "@/interfaces/admin.interface"
import { FC } from "react"
import AdminActions from "./adminActions"

const AdminListItem: FC<IAdminListItem> = ({ removeHandler, listItem}) => {  
    return (
      <div className="border border-white my-4 p-4">
        {listItem.items.map(value => (
            <div className="" key={value}>
                {value}                
            </div>
        ))}
        <AdminActions
            viewUrl={listItem.viewUrl}
            editUrl={listItem.editUrl}
            removeHandler={removeHandler}
        />
      </div>      
    )
  }
  
  export default AdminListItem