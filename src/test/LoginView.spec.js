import {it, expect} from 'vitest';
import {shallowMount} from '@vue/test-utils';
import LoginView from '../views/LoginView.vue'

it('Loguear el user correctamente', () => {
    const component = shallowMount(LoginView);
    component.vm.login();
    expect((component.vm.login()).toBe('FrancoLescano123'));
});


