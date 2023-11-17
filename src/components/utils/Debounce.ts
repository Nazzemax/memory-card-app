export const debounce = (func:() => void, wait:number) => {
    let timeout:NodeJS.Timeout
  
    return function executedFunction(...args: unknown[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }