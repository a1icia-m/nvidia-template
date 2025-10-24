// Simple store for managing contact status across the app
type ContactStatusListener = () => void;

class ContactStore {
  private contactedCompanies: Set<string> = new Set(['1', '5']); // Initial contacted companies
  private initialContactedCount: number = 2; // Track initial count
  private listeners: ContactStatusListener[] = [];
  private totalCompanies: number = 5; // Will be updated

  setTotalCompanies(total: number) {
    this.totalCompanies = total;
  }

  subscribe(listener: ContactStatusListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  toggleContact(companyId: string) {
    if (this.contactedCompanies.has(companyId)) {
      this.contactedCompanies.delete(companyId);
    } else {
      this.contactedCompanies.add(companyId);
    }
    this.notifyListeners();
  }

  isContacted(companyId: string): boolean {
    return this.contactedCompanies.has(companyId);
  }

  getContactStats() {
    return {
      contacted: this.contactedCompanies.size,
      total: this.totalCompanies,
      initial: this.initialContactedCount,
    };
  }

  getNewlyContactedCompanies(): string[] {
    // Returns IDs of companies that were contacted after initial state
    const initial = ['1', '5']; // Initial contacted companies
    return Array.from(this.contactedCompanies).filter(id => !initial.includes(id));
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

export const contactStore = new ContactStore();
