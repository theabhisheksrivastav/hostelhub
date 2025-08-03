import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ContactSalesModal({ open, onOpenChange }: { open: boolean; onOpenChange: (val: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Sales</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input placeholder="Your Name" required />
          <Input placeholder="Email" type="email" required />
          <Input placeholder="Contact Number" type="tel" required />
          <Textarea placeholder="Tell us about your requirements..." rows={4} />
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
