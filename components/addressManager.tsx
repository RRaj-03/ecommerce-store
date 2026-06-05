"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Button from "./ui/button";

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

interface AddressManagerProps {
  onSelect?: (address: Address) => void;
  selectedId?: string;
  selectable?: boolean;
}

const AddressManager: React.FC<AddressManagerProps> = ({ onSelect, selectedId, selectable = false }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    isDefault: false,
  });

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/addresses");
      if (res.ok) {
        const data = await res.json();
        setAddresses(data);
        if (selectable && data.length > 0 && !selectedId) {
          const def = data.find((a: Address) => a.isDefault) || data[0];
          onSelect?.(def);
        }
      }
    } catch (error) {
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm({ name: "", street: "", city: "", state: "", pincode: "", country: "India", isDefault: false });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (address: Address) => {
    setForm(address);
    setEditingId(address.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/auth/addresses/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Address deleted");
        fetchAddresses();
      } else {
        toast.error("Failed to delete address");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editingId;
    const url = isEdit ? `/api/auth/addresses/${editingId}` : "/api/auth/addresses";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(isEdit ? "Address updated" : "Address added");
        resetForm();
        fetchAddresses();
      } else {
        const err = await res.text();
        toast.error(err || "Failed to save address");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return <div className="flex justify-center py-4"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  }

  if (isAdding) {
    return (
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" /> {editingId ? "Edit Address" : "Add New Address"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Name (e.g., Home, Work)</label>
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Street Address</label>
              <input required value={form.street} onChange={e => setForm({ ...form, street: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">City</label>
              <input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">State</label>
              <input required value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Pincode</label>
              <input required value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Country</label>
              <input required value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isDefault" checked={form.isDefault} onChange={e => setForm({ ...form, isDefault: e.target.checked })} />
            <label htmlFor="isDefault" className="text-sm font-medium cursor-pointer">Set as default address</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" onClick={resetForm} className="bg-transparent border border-border text-foreground hover:bg-muted">Cancel</Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:opacity-90">Save Address</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {addresses.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-border rounded-2xl bg-muted/30">
          <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground mb-4">No saved addresses found.</p>
          <Button onClick={() => setIsAdding(true)} className="bg-primary text-primary-foreground rounded-full px-6">
            Add New Address
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((address) => {
            const isSelected = selectable && selectedId === address.id;
            return (
              <div 
                key={address.id} 
                onClick={() => selectable && onSelect?.(address)}
                className={`p-4 border rounded-2xl transition-all ${selectable ? "cursor-pointer" : ""} ${isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-card hover:border-primary/50"}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    {selectable && (
                      <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        {address.name}
                        {address.isDefault && <span className="text-[10px] uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {address.street}, {address.city}, {address.state} {address.pincode}, {address.country}
                      </p>
                    </div>
                  </div>
                  {!selectable && (
                    <div className="flex gap-2">
                      <button onClick={(e) => { e.stopPropagation(); handleEdit(address); }} className="p-2 text-muted-foreground hover:text-primary transition rounded-full hover:bg-muted">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(address.id); }} className="p-2 text-muted-foreground hover:text-destructive transition rounded-full hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <Button onClick={() => setIsAdding(true)} className="w-full flex items-center justify-center gap-2 bg-transparent border border-dashed border-primary/50 text-primary hover:bg-primary/5 rounded-2xl py-3 mt-2">
            <Plus className="w-4 h-4" /> Add New Address
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddressManager;
