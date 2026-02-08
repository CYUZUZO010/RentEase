import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 ml-10 lg:mb-3">
        
            <h1 className=" text-3xl sm:text-6xl lg:text-6xl font-bold leading-tight text-balance mb-1 lg:mb-2 sm:pt-10">
              Unlock Your Future.{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text">
                Find Your Perfect Property
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl text-pretty ">
              Discover exceptional rental properties perferred for your lifestyle.
              From modern apartments to luxury homes, find your ideal space with
              ease.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-base border-2">
                <Link href="/properties">
                  Browse Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base bg-transparent"
              >
                <Link href="/register">List Your Property:</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div>
                <div className="text-4xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">
                  Properties Listed
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Renters
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">
                  Satisfaction Rate
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Property Image */}
          <div className="relative mt-5">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
              <Image
                src="/modern-downtown-apartment-exterior.jpg"
                alt="Modern luxury property"
                width={600}
                height={700}
                className="w-full h-auto object-cover "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              {/* Property Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    Featured
                  </span>
                  <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium">
                    Available Now
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Modern Downtown Apartment
                </h3>
                <p className="text-muted-foreground">
                  2 Beds • 2 Baths • 1,200 sq ft
                </p>
                <div className="text-3xl font-bold text-primary">$2,500/mo</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
