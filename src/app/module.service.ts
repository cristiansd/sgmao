import { Injectable } from '@angular/core';

import { Module } from './module';
import { MODULES } from './modules'


@Injectable()
export class ModuleService {
	getModules(): Module[] {
		return MODULES;
	}
}
