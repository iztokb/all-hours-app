import { Injectable } from '@angular/core';
import { IStorageItem, StorageType } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService extends BaseService {
  constructor() {
    super();
  }

  deleteItemFromStorage(storageType: StorageType, key: string): void {
    // Prevent using the wrong method
    if (storageType === 'INDEX_DB') {
      // TODO: Implement some kind of logging
      console.warn(
        `Wrong method used. This method doesn't support saving to IndexDB.`
      );
      return;
    }

    // Check if storage is available
    const storageAvailable: boolean | null =
      this._checkStorageCompliance(storageType);

    if (storageAvailable === null || storageAvailable === false) {
      // TODO: Implement some kind of logging
      console.warn(
        `It seems that requested storage is not available on this device`
      );
      return;
    }

    // Resolve correct storage
    const storage =
      storageType === 'LOCAL_STORAGE'
        ? window.localStorage
        : window.sessionStorage;

    storage.removeItem(key);
  }

  getItemFromStorage(storageType: StorageType, key: string): string | null {
    // Prevent using the wrong method
    if (storageType === 'INDEX_DB') {
      // TODO: Implement some kind of logging
      console.warn(
        `Wrong method used. This method doesn't support saving to IndexDB.`
      );

      return null;
    }

    // Check if storage is available
    const storageAvailable: boolean | null =
      this._checkStorageCompliance(storageType);

    if (storageAvailable === null || storageAvailable === false) {
      console.warn(
        `It seems that requested storage is not available on this device`
      );
      return null;
    }

    // Resolve correct storage
    const storage =
      storageType === 'LOCAL_STORAGE'
        ? window.localStorage
        : window.sessionStorage;

    return storage.getItem(key);
  }

  saveItemToStorage(storageType: StorageType, item: IStorageItem): boolean {
    // Prevent using the wrong method
    if (storageType === 'INDEX_DB') {
      // TODO: Implement some kind of logging
      console.warn(
        `Wrong method used. This method doesn't support saving to IndexDB.`
      );
      return false;
    }

    // Check if storage is available
    const storageAvailable: boolean | null =
      this._checkStorageCompliance(storageType);

    if (storageAvailable === null || storageAvailable === false) {
      console.warn(
        `It seems that requested storage is not available on this device`
      );
      return false;
    }

    // Resolve correct storage
    const storage =
      storageType === 'LOCAL_STORAGE'
        ? window.localStorage
        : window.sessionStorage;

    // Save data
    storage.setItem(item.key, item.value);

    return true;
  }

  private _checkStorageCompliance(
    requestedStorage: StorageType
  ): boolean | null {
    switch (requestedStorage) {
      case 'INDEX_DB': {
        return window.indexedDB ? true : false;
      }

      case 'LOCAL_STORAGE': {
        return window.localStorage ? true : false;
      }

      case 'SESSION_STORAGE': {
        return window.sessionStorage ? true : false;
      }

      default: {
        return null;
      }
    }
  }
}
