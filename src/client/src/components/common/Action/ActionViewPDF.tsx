import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';

interface ActionViewPDFProps {
    trigger: React.ReactNode;
    title?: string;
    file?: File;
}

export default function ActionViewPDF({
    trigger,
    title,
    file
}: ActionViewPDFProps) {
    const fileUrl = file ? URL.createObjectURL(file) : '';

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="!max-w-[90vw] w-full h-[96vh] overflow-auto">
                <div className='flex-1'>
                    <DialogHeader> <DialogTitle></DialogTitle> </DialogHeader>
                    <iframe
                        src={fileUrl}
                        className="w-full h-full"
                        title={title}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}               
