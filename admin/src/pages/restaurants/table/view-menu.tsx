import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { getRestaurant } from '../api';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MenuItem } from '../types';
import { Coffee, Martini, Utensils } from 'lucide-react';
import { MenuTimings } from '../form/menu/menu-form';


function ViewMenu({ id }: { id: string }) {
    const [menu, setMenu] = useState<MenuItem[]>([])
    const [open, setOpen] = useState(false)
    const { mutate } = useMutation({
        mutationFn: getRestaurant,
        onSuccess: (data) => {
            if (data.data.menu) {
                setMenu(data.data.menu)
            }
        }
    });

    useEffect(() => {
        if (open && id) {
            mutate(id)
        }

        return () => {
            setMenu([])
        }
    }, [open])

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild><Button variant={"link"} className='py-0 h-auto'>View</Button></DialogTrigger>
                <DialogContent className='max-w-3xl'>
                    <DialogHeader>
                        <DialogTitle className='text-foreground'>Menu Items</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="overflow-x-auto mt-6">
                        <ScrollArea className="h-60 rounded-md">
                            <table className="min-w-full table-auto border-collapse">
                                <thead className="sticky top-0">
                                    <tr className="bg-muted">
                                        <th className="px-4 py-2 text-left font-semibold text-foreground text-sm">Day</th>
                                        <th className="px-4 py-2 text-left font-semibold text-foreground  text-sm">Name</th>
                                        <th className="px-4 py-2 text-left font-semibold text-foreground  text-sm"></th>
                                        <th className="px-4 py-2 text-left font-semibold text-foreground  text-sm">Price</th>
                                        <th className="px-4 py-2 text-left font-semibold text-foreground  text-sm">Timings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(menu) && <>
                                        {menu.map((item, index) => (
                                            <tr className="bg-background border-b" key={'menu_item_' + index}>
                                                <td className="px-4 py-2 text-foreground  capitalize">{item.day}</td>
                                                <td className="px-4 py-2 text-foreground" colSpan={2}>
                                                    <div className='flex justify-start items-center gap-1'>
                                                        <MenuIcon category={item.category} />
                                                        {item.name}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 text-foreground ">{item.price ? <>${item.price}</> : <>-</>}</td>
                                                <td className="px-4 py-2 text-foreground">
                                                    <MenuTimings timings={item.timings} />
                                                </td>
                                            </tr>
                                        ))}
                                        {menu.length == 0 &&
                                            <tr className="bg-background border-b" key={'menu_item_empty'}>
                                                <td className="p-4 text-foreground  text-center" colSpan={4}>
                                                    This restaurant doesn't have any lunch specials or menu items yet.
                                                </td>
                                            </tr>
                                        }
                                    </>}
                                </tbody>
                            </table>
                        </ScrollArea>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"secondary"}>Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default ViewMenu


const MenuIcon = ({ category }: { category: string }) => {
    switch (category) {
        case 'drink':
            return <Martini />;
        case 'lunch':
            return <Utensils />;
        case 'ct':
            return <Coffee />;
        default:
            return <Utensils />;
    }
}