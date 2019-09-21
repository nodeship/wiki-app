export class LocalStorageService {

    getItem<T>(key: string): T {
        const value = window.localStorage.getItem(key) as T;
        return value ? JSON.parse(value) : value;
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

