export class LocalStorageService {

    getItem<T>(key: string): T | string | null {
        const value = window.localStorage.getItem(key) ;
        return value ? JSON.parse(value) as T : value;
    }

    setItem(key: string, value: object) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    removeItem(key: string) {
        window.localStorage.removeItem('key');
    }

    clear() {
        window.localStorage.clear();
    }
}

