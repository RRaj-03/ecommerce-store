import getStores from "@/actions/getStore";
import {
  WrenchScrewdriverIcon,
  BuildingOffice2Icon,
  CurrencyRupeeIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
const features = [
  {
    name: "QUALITY PRODUCTS",
    description:
      "We make quality products that suits everyone needs, gives joy to everyone from elderly to kids.",
    icon: WrenchScrewdriverIcon,
  },
  {
    name: "COST EFFECTIVE",
    description:
      "Our products are the most economical in all the regions we serve. Starting at just ₹199.",
    icon: CurrencyRupeeIcon,
  },
  {
    name: "MULTIPLE BRANDS & MODELS",
    description:
      "We deliver products of all brands and models, including Philips, Samsung, Apple, SkyBags, etc.",
    icon: BuildingOffice2Icon,
  },
  {
    name: "INSTANT DELIVERY",
    description:
      "we deliver your products with utmost urgency and care, because we know your needs",
    icon: RocketLaunchIcon,
  },
];

export default async function About() {
  const storeName = (await getStores()).name;
  return (
    <div className="bg-white px-4 sm:px-8 py-24 sm:py-32 grid grid-cols-6 gap-8 items-center justify-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 col-span-6 lg:col-span-6">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {storeName}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Delivering Products at Your DoorStep
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We are the most trusted Ecommerce Service in Siwan, Chappra, and
            nearby regions, with 5,000+ happy customers.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
