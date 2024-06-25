'use client'

import { Button } from "@/components/ui/button"
import { IListItem } from "@/interfaces/admin.interface"
import { useRouter } from "next/navigation"
import { FC } from "react"

interface IAdminActions extends Pick<IListItem, 'editUrl' | 'viewUrl'> {
    removeHandler?: () => void
}

const AdminActions: FC<IAdminActions> = ({
    editUrl,
    removeHandler,
    viewUrl
}) => {
    const { push } = useRouter()

    return (
        <div className="mt-4 gap-x-4 flex max-sm:flex max-sm:flex-col max-sm:gap-2">
            {viewUrl && (
                <Button onClick={() => push(viewUrl)}>
                    Посмотреть
                </Button>
            )}
            {editUrl && (
                <Button onClick={() => push(editUrl)}>
                    Редактировать
                </Button>
            )}
            {removeHandler && (
                <Button onClick={removeHandler}>
                    Удалить
                </Button>
            )}
        </div>
    )
}

export default AdminActions