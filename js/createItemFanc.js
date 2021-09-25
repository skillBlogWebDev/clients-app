import { svgEmail, svgFb, svgOther, svgPhone, svgVK } from './svg.js';
import {
  contactTooltip
} from './contactTooltip.js';
let contactLinkEmail;
let contactLinkPhone;
let contactLinkOther;
let contactLinkVK;
let contactLinkFb;

export function createContactElement(type, value, element, svg, item) {
  const tooltipSet = contactTooltip(type, value);
  element = document.createElement('a');
  element.classList.add('contacts__link');
  element.innerHTML = svg;
  if (type == 'Email') {
    element.href = `mailto:${value.trim()}`;
  } else if (type == 'Телефон') {
    element.href = `tel:${value.trim()}`;
    tooltipSet.tooltipValue.style.color = 'var(--color-white)';
    tooltipSet.tooltipValue.style.textDecoration = 'none';
    tooltipSet.tooltipValue.style.minWidth = '110px';
  } else {
    element.href = value.trim();
  }

  element.append(tooltipSet.tooltip);
  item.append(element);
}

export function formatPhone(phone){
  let pt = /[\(\)\- ]/gi;
  let code = phone.substr(0,1);
  let correctCode = +code - 1;

  phone = phone.replace(pt, '');
  phone = phone.substr(0,1).replace(code, `+${correctCode}`)+' ('+phone.substr(1,3)+') '+phone.substr(4,3)+'-'+phone.substr(7,2)+'-'+phone.substr(9);
  return phone;
}

export function createContactItemByType(type, value, item) {
  if (type === 'Телефон')
    createContactElement(type, formatPhone(value), contactLinkPhone, svgPhone, item);
  if (type === 'Facebook')
    createContactElement(type, value, contactLinkFb, svgFb, item);
  if (type === 'VK')
    createContactElement(type, value, contactLinkVK, svgVK, item);
  if (type === 'Email')
    createContactElement(type, value, contactLinkEmail, svgEmail, item);
  if (type === 'Другое')
    createContactElement(type, value, contactLinkOther, svgOther, item);
}

export function formatDate(date) {
  const newDate = new Date(date);

  let correctDate = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  let resultDate = newDate.toLocaleString("ru", correctDate);

  return resultDate;
}

export function formatTime(date) {
  const newTime = new Date(date);

  let correcttime = {
    hour: 'numeric',
    minute: 'numeric',
  }

  let resltTime = newTime.toLocaleString("ru", correcttime);

  return resltTime;
}
