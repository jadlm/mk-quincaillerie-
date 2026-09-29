import store from '../data/store.json'

export const contact = {
  whatsapp: store.whatsapp,
  phone: store.phone,
  email: store.email,
}

export const location = {
  latitude: store.latitude,
  longitude: store.longitude,
  address: store.address,
  city: store.city,
  country: store.country,
}