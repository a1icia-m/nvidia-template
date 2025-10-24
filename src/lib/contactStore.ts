// Simple store for managing contact status across the app
type ContactStatusListener = () => void;

class ContactStore {
  private contactedCompanies: Set<string> = new Set(['1', '5']); // Initial contacted companies
  private initialContactedCompanies: Set<string> = new Set(['1', '5']); // Track initial state
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
    const newlyContacted: string[] = [];
    this.contactedCompanies.forEach(id => {
      if (!this.initialContactedCompanies.has(id)) {
        newlyContacted.push(id);
      }
    });
    return newlyContacted;
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

export const contactStore = new ContactStore();
