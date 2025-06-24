import { readFileSync } from 'fs';
import { Service } from '@/models/Service';

const _demoServices = JSON.parse(readFileSync('./assets/demo-services.json', 'utf-8'));

// console.log(_demoServices);
export async function setupDemoServices() {

  // check if services already exist
  const services = await Service.find();
  
  if (services.length > 0) {
    console.log('Demo services already exist');
    return;
  }
  _demoServices.forEach(async (service : any) => {
    const newService = new Service({
      serviceId: Date.now() + Math.floor(Math.random() * 1000),
      name: service.name,
      description: service.description,
      price: service.price,
      category: service.category,
      image: service.image,
      rating: service.rating,
      reviews: service.reviews,
    });
    await newService.save();
  });
  console.log('Demo services created');
}
