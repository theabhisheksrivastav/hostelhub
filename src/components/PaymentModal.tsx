import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function PaymentModal({ open, onOpenChange, price }: { open: boolean; onOpenChange: (val: boolean) => void; price: string }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600 mb-4">You're about to start a trial for <strong>₹{price}</strong></p>
        {/* Add your actual payment logic or a dummy button */}
        <Button className="w-full">Proceed to Payment</Button>
      </DialogContent>
    </Dialog>
  )
}
