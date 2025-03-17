import { Button } from '@/components/ui/button'
import { FormLabel } from '@/components/ui/form'
import { Martini, Settings2, Trash2, Utensils } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { MenuItem } from '../../types'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from 'react'
import RestaurantItemForm from './item-form'

import { ScrollArea } from "@/components/ui/scroll-area"
import { parse } from 'date-fns/parse'
import { format } from 'date-fns/format'

function MenuForm() {
    const form = useFormContext()
    const menu: MenuItem[] = form.watch('menu') || []
    const [currentIndex, setCurrentIndex] = useState(menu.length || 0)
    useEffect(() => {
        setCurrentIndex(menu.length)
        return () => {

        }
    }, [menu.length])
    const [menuDialog, setMenuDialog] = useState(false)

    const openMenuDialog = () => {
        setMenuDialog(true)
    }

    const closeMenuDialog = () => {
        setMenuDialog(false)
    }

    const onDelete = (index: number) => {
        const menuAfterDelete = menu;
        menuAfterDelete.splice(index, 1);
        form.setValue('menu', menuAfterDelete)
    }

    const onEdit = (index: number) => {
        console.log('first', index)
        setMenuDialog(true)
        setCurrentIndex(index)
    }

    return (
        <div className="flex flex-col gap-y-0.5">
            <div className="flex justify-between items-center">
                <FormLabel className="text-lg">Lunch Special</FormLabel>
                <Dialog open={menuDialog} onOpenChange={setMenuDialog}>
                    <DialogTrigger asChild><Button size={"sm"} variant={"outline"} type="button" onClick={() => setCurrentIndex(menu.length)}><Utensils /> Add Menu </Button></DialogTrigger>
                    <DialogContent>
                        <RestaurantItemForm index={currentIndex} onOpenChange={closeMenuDialog} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="overflow-x-auto mt-6">
                <ScrollArea className="h-80 rounded-md">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="sticky top-0">
                            <tr className="bg-muted">
                                <th className="px-4 py-2 text-left font-semibold text-foreground text-sm">Day</th>
                                <th className="px-4 py-2 text-left font-semibold text-foreground text-sm">Name</th>
                                <th className="px-4 py-2 text-left font-semibold text-foreground text-sm">Price</th>
                                <th className="px-4 py-2 text-left font-semibold text-foreground text-sm">Timings</th>
                                <th className="px-4 py-2 text-left font-semibold text-foreground text-sm"></th>
                            </tr>
                        </thead>
                        <tbody className='text-sm'>
                            {Array.isArray(menu) && <>
                                {menu.map((item, index) => (
                                    <tr className="bg-background border-b" key={'menu_item_' + index}>
                                        <td className="px-4 py-2 text-foreground  capitalize">{item.day}</td>
                                        <td className="px-4 py-2 text-foreground ">
                                            <div className='flex justify-start items-center gap-1'>
                                                {item.category == 'drink' ? <Martini /> : <Utensils />}
                                                {item.name}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-foreground ">${item.price}</td>
                                        <td className="px-4 py-2 text-foreground">
                                            <MenuTimings timings={item.timings} />
                                        </td>
                                        <th className="px-4 py-2 text-left font-semibold text-foreground text-sm">
                                            <Button variant={'ghost'} size={'icon'} type='button' onClick={() => onEdit(index)}>
                                                <Settings2 className='h-5 w-5 text-primary' />
                                            </Button>

                                            <Button variant={'ghost'} size={'icon'} type='button' onClick={() => onDelete(index)}>
                                                <Trash2 className='h-5 w-5 text-destructive' />
                                            </Button>
                                        </th>
                                    </tr>
                                ))}
                                {menu.length == 0 &&
                                    <tr className="bg-background border-b" key={'menu_item_empty'}>
                                        <td className="p-4 text-foreground  text-center" colSpan={4}>
                                            This restaurant doesn't have any lunch specials or menu items yet.
                                            <Button variant={'link'} className='p-0 px-1' type='button' onClick={openMenuDialog}>
                                                Click here to add an item.
                                            </Button>
                                        </td>
                                    </tr>
                                }
                            </>}
                        </tbody>
                    </table>
                </ScrollArea>
            </div>

            {/* <!-- Mobile view --> */}
            {/* <div className="lg:hidden">
                <div className="border-b p-4">
                    <h3 className="font-bold text-gray-800">Items</h3>
                    <div className="my-2">
                        <p><strong>Day:</strong> Wednesday</p>
                        <p><strong>Name:</strong> Test</p>
                        <p><strong>Price:</strong> $500</p>
                    </div>
                </div>
                <div className="border-b p-4">
                    <h3 className="font-bold text-gray-800">Items</h3>
                    <div className="my-2">
                        <p><strong>Day:</strong> Monday</p>
                        <p><strong>Name:</strong> New</p>
                        <p><strong>Price:</strong> $230</p>
                    </div>
                </div>
            </div> */}

        </div >
    )
}

export default MenuForm

export const MenuTimings = ({ timings }: Pick<MenuItem, 'timings'>) => {
    if (timings && timings.opening && timings.closing) {
        const openingTime = parse(timings.opening, 'HH:mm', new Date());
        const closingTime = parse(timings.closing, 'HH:mm', new Date());
        return <>
            {timings && <div className="flex justify-start items-center gap-1 w-fit">
                <span>{format(openingTime, 'hh:mm a')}</span>
                <span>to</span>
                <span>{format(closingTime, 'hh:mm a')}</span>
            </div>}
        </>
    }
}