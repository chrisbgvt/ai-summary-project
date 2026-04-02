"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
    DialogOverlay,
} from "@/components/ui/dialog";
import { format } from "date-fns";

export const FilterModal = ({
    selectedDate: initialDate,
    onApply,
    onReset,
    triggerLabel = "Filter by date",
}: {
    selectedDate?: Date;
    onApply: (date?: Date) => void;
    onReset: () => void;
    triggerLabel?: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);

    useEffect(() => {
        setSelectedDate(initialDate);
    }, [initialDate]);

    const handleReset = () => {
        setSelectedDate(undefined);
        onReset();
        setIsOpen(false);
    };

    const handleApply = () => {
        onApply(selectedDate);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    {selectedDate ? `Filter: ${format(selectedDate, "yyyy-MM-dd")}` : triggerLabel}
                </Button>
            </DialogTrigger>

            <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />

            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Filter by date</DialogTitle>
                    <DialogDescription>
                        Select date to filter by.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-center py-4">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                    />
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button onClick={handleApply}>Apply</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};