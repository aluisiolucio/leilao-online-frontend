import {
    AlertDialog,
    AlertDialogAction,
    // AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    // AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"


type AlertModalProps = {
    title: string
    description: string
    isOpen: boolean
    onClose: () => void
}
  
export function AlertModal({ title, description, isOpen, onClose }: AlertModalProps) {
    return (
        <AlertDialog onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
            {/* <AlertDialogTrigger asChild>Open</AlertDialogTrigger> */}
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                <AlertDialogAction>OK</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}