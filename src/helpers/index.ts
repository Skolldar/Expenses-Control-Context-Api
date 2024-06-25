
export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amount)
}


export function formatDate(dateStr: string) : string {
    const dateObj = new Date(dateStr);

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long', // Valid option value
        year: 'numeric',  // Valid option value
        month: 'long',    // Valid option value
        day: 'numeric',   // Valid option value
      };
    
      return new Intl.DateTimeFormat('en-EN', options).format(dateObj);
    }