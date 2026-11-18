"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  HelpCircle,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  CATALOG_CATEGORIES,
  CATALOG_COURSES,
  CATALOG_INSTRUCTORS,
  CATALOG_LEVELS,
  CATALOG_MODES,
  CATALOG_PRICE_FILTERS,
  CATALOG_RATINGS,
  CATALOG_SORT_OPTIONS,
} from "@/data/coursesCatalog";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";

export function CoursesCatalogView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedModes, setSelectedModes] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleItem = (list, setter, value) => {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    setSortBy("popular");
    setSelectedCategories([]);
    setPriceFilter("all");
    setSelectedLevels([]);
    setSelectedModes([]);
    setMinRating(0);
    setSelectedInstructors([]);
    setCurrentPage(1);
  };

  const autocompleteMatches = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return [];
    return CATALOG_COURSES.filter(
      (course) =>
        course.title.toLowerCase().includes(trimmed) ||
        course.category.toLowerCase().includes(trimmed) ||
        course.instructor.name.toLowerCase().includes(trimmed)
    ).slice(0, 4);
  }, [searchQuery]);

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = CATALOG_COURSES.filter((course) => {
      if (query) {
        const haystack =
          `${course.title} ${course.description} ${course.category} ${course.instructor.name}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(course.category)) {
        return false;
      }
      if (priceFilter === "paid" && course.isFree) return false;
      if (priceFilter === "free" && !course.isFree) return false;
      if (selectedLevels.length > 0 && !selectedLevels.includes(course.level)) {
        return false;
      }
      if (selectedModes.length > 0 && !selectedModes.includes(course.mode)) {
        return false;
      }
      if (minRating > 0 && course.rating < minRating) {
        return false;
      }
      if (
        selectedInstructors.length > 0 &&
        !selectedInstructors.includes(course.instructor.name)
      ) {
        return false;
      }
      return true;
    });

    const sorted = [...list];
    switch (sortBy) {
      case "newest":
        sorted.sort((a, b) => b.batchOrder - a.batchOrder);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
    }
    return sorted;
  }, [
    searchQuery,
    selectedCategories,
    priceFilter,
    selectedLevels,
    selectedModes,
    minRating,
    selectedInstructors,
    sortBy,
  ]);

  const activeFilterChips = useMemo(() => {
    const chips = [];
    selectedCategories.forEach((cat) =>
      chips.push({
        key: `cat-${cat}`,
        label: cat,
        onRemove: () => toggleItem(selectedCategories, setSelectedCategories, cat),
      })
    );
    if (priceFilter !== "all") {
      chips.push({
        key: `price-${priceFilter}`,
        label: priceFilter === "paid" ? "Paid Programs" : "Free Workshops",
        onRemove: () => setPriceFilter("all"),
      });
    }
    selectedLevels.forEach((lvl) =>
      chips.push({
        key: `lvl-${lvl}`,
        label: lvl,
        onRemove: () => toggleItem(selectedLevels, setSelectedLevels, lvl),
      })
    );
    selectedModes.forEach((mode) =>
      chips.push({
        key: `mode-${mode}`,
        label: mode,
        onRemove: () => toggleItem(selectedModes, setSelectedModes, mode),
      })
    );
    if (minRating > 0) {
      chips.push({
        key: `rating-${minRating}`,
        label: `${minRating}+ Stars`,
        onRemove: () => setMinRating(0),
      });
    }
    selectedInstructors.forEach((inst) =>
      chips.push({
        key: `inst-${inst}`,
        label: inst,
        onRemove: () => toggleItem(selectedInstructors, setSelectedInstructors, inst),
      })
    );
    return chips;
  }, [
    selectedCategories,
    priceFilter,
    selectedLevels,
    selectedModes,
    minRating,
    selectedInstructors,
  ]);

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <SiteHeader
        activePath="courses"
        initialSearch={searchQuery}
        onSearchSubmit={(val) => setSearchQuery(val)}
      />

      <main className="w-full pt-20 flex-1">
        <div className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter py-space-xl">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm mb-space-md"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-outline" aria-hidden="true" />
            <span className="text-on-surface font-semibold">Courses Catalog</span>
          </nav>

          {/* Editorial Hero Header */}
          <section className="rounded-2xl bg-surface-container-low p-space-lg sm:p-space-xl mb-space-xl flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold mb-space-sm">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Academic Curriculum 2025
              </span>
              <h1 className="font-display-hero-mobile sm:font-display-hero text-display-hero-mobile sm:text-headline-lg text-on-surface tracking-tight mb-space-sm">
                Explore Career-Focused Courses
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Structured live cohorts and self-paced engineering tracks mentored by senior
                practitioners across Bangladesh and global remote tech teams.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-space-md shrink-0">
              <div className="px-space-md py-space-sm rounded-xl bg-surface-container-lowest shadow-sm">
                <p className="font-headline-sm text-headline-sm text-primary font-bold">42</p>
                <p className="font-caption text-caption text-on-surface-variant">Active Tracks</p>
              </div>
              <div className="px-space-md py-space-sm rounded-xl bg-surface-container-lowest shadow-sm">
                <p className="font-headline-sm text-headline-sm text-tertiary font-bold">100%</p>
                <p className="font-caption text-caption text-on-surface-variant">
                  Live Mentor Guidance
                </p>
              </div>
            </div>
          </section>

          {/* Search, Sort & Mobile Filter Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
            <div className="relative flex-1 max-w-xl">
              <Search
                aria-hidden="true"
                className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 160)}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Search courses, instructors, or skills"
                placeholder="Search MERN, Figma, Python AI, Tanvir Hasan..."
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-surface-container-lowest shadow-sm text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-container/25 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}

              {/* Autocomplete Dropdown */}
              {searchFocused && autocompleteMatches.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 z-30 rounded-xl bg-surface-container-lowest shadow-lg border border-outline-variant/40 overflow-hidden">
                  {autocompleteMatches.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onMouseDown={() => setSearchQuery(item.title)}
                      className="w-full px-space-md py-2.5 text-left hover:bg-surface-container-low flex items-center justify-between gap-space-sm transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
                          {item.title}
                        </p>
                        <p className="font-caption text-caption text-on-surface-variant">
                          {item.category} • {item.instructor.name}
                        </p>
                      </div>
                      <span className="font-label-sm text-label-sm text-primary font-semibold shrink-0">
                        {item.priceFormatted}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-space-sm">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen((prev) => !prev)}
                className="lg:hidden inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container-lowest shadow-sm text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Filters</span>
                {activeFilterChips.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-primary-container text-on-primary font-caption text-caption">
                    {activeFilterChips.length}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2 bg-surface-container-lowest rounded-xl px-space-md py-2 shadow-sm">
                <label
                  htmlFor="catalog-sort"
                  className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap"
                >
                  Sort by:
                </label>
                <select
                  id="catalog-sort"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="bg-transparent text-on-surface font-label-md text-label-md font-semibold focus:outline-none cursor-pointer"
                >
                  {CATALOG_SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Main 12-Col Catalog Layout */}
          <div id="batches" className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* Left Filter Sidebar */}
            <aside
              className={`${
                mobileFiltersOpen ? "flex" : "hidden"
              } lg:flex lg:col-span-3 flex-col gap-space-lg lg:sticky lg:top-24`}
            >
              <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-lg">
                <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-primary" aria-hidden="true" />
                    <h2 className="font-title-md text-title-md text-on-surface font-bold">
                      Filter Courses
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="font-label-sm text-label-sm text-secondary hover:text-primary font-semibold transition-colors"
                  >
                    Reset All
                  </button>
                </div>

                {/* Category Filter */}
                <div className="flex flex-col gap-2.5">
                  <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Category
                  </h3>
                  {CATALOG_CATEGORIES.map((cat) => {
                    const isAll = cat.id === "all";
                    const checked = isAll
                      ? selectedCategories.length === 0
                      : selectedCategories.includes(cat.id);

                    return (
                      <label
                        key={cat.id}
                        className="flex items-center justify-between gap-2 cursor-pointer group"
                      >
                        <span className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              if (isAll) {
                                setSelectedCategories([]);
                              } else {
                                toggleItem(selectedCategories, setSelectedCategories, cat.id);
                              }
                            }}
                            className="w-4 h-4 rounded accent-primary-container cursor-pointer"
                          />
                          <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                            {cat.label}
                          </span>
                        </span>
                        <span className="font-caption text-caption text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                          {cat.count}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Investment / Tuition */}
                <div className="flex flex-col gap-2.5 pt-space-sm border-t border-surface-container">
                  <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Tuition & Investment
                  </h3>
                  {CATALOG_PRICE_FILTERS.map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="catalog-price"
                        checked={priceFilter === opt.id}
                        onChange={() => setPriceFilter(opt.id)}
                        className="w-4 h-4 accent-primary-container cursor-pointer"
                      />
                      <span className="font-body-sm text-body-sm text-on-surface">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Proficiency Level Pills */}
                <div className="flex flex-col gap-2.5 pt-space-sm border-t border-surface-container">
                  <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Proficiency Level
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {CATALOG_LEVELS.map((level) => {
                      const active = selectedLevels.includes(level);
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => toggleItem(selectedLevels, setSelectedLevels, level)}
                          className={
                            active
                              ? "px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold shadow-sm transition-all"
                              : "px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-sm text-label-sm transition-all"
                          }
                        >
                          {level}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Mode */}
                <div className="flex flex-col gap-2.5 pt-space-sm border-t border-surface-container">
                  <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Batch Delivery Mode
                  </h3>
                  {CATALOG_MODES.map((mode) => (
                    <label key={mode.id} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedModes.includes(mode.id)}
                        onChange={() => toggleItem(selectedModes, setSelectedModes, mode.id)}
                        className="w-4 h-4 rounded accent-primary-container cursor-pointer"
                      />
                      <span className="font-body-sm text-body-sm text-on-surface">
                        {mode.label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Minimum Rating */}
                <div className="flex flex-col gap-2.5 pt-space-sm border-t border-surface-container">
                  <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Minimum Rating
                  </h3>
                  {CATALOG_RATINGS.map((item) => (
                    <label key={item.label} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="catalog-rating"
                        checked={minRating === item.value}
                        onChange={() => setMinRating(item.value)}
                        className="w-4 h-4 accent-primary-container cursor-pointer"
                      />
                      <span className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface">
                        {item.value > 0 && (
                          <Star
                            className="w-3.5 h-3.5 text-secondary fill-secondary"
                            aria-hidden="true"
                          />
                        )}
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Lead Instructors */}
                <div className="flex flex-col gap-2.5 pt-space-sm border-t border-surface-container">
                  <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Lead Instructors
                  </h3>
                  {CATALOG_INSTRUCTORS.map((name) => (
                    <label key={name} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedInstructors.includes(name)}
                        onChange={() => toggleItem(selectedInstructors, setSelectedInstructors, name)}
                        className="w-4 h-4 rounded accent-primary-container cursor-pointer"
                      />
                      <span className="font-body-sm text-body-sm text-on-surface">{name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Career Guidance Card */}
              <div className="rounded-2xl bg-surface-container-low p-space-lg flex flex-col gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  Need Career Guidance?
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Not sure whether to start with Web Engineering, UI/UX, or Data Science? Book a
                  free 15-minute academic counseling call.
                </p>
                <Link
                  href="/course-details"
                  className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-semibold hover:underline mt-1"
                >
                  <span>Speak with an Advisor</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </aside>

            {/* Right Course Grid Column */}
            <div className="lg:col-span-9 flex flex-col gap-space-lg min-w-0">
              {/* Active Filter Pills & Result Count */}
              <div className="flex flex-wrap items-center justify-between gap-space-sm">
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Showing{" "}
                  <span className="font-semibold text-on-surface">{filteredCourses.length}</span> of{" "}
                  <span className="font-semibold text-on-surface">{CATALOG_COURSES.length}</span>{" "}
                  featured catalog programs
                </p>

                {activeFilterChips.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {activeFilterChips.map((chip) => (
                      <button
                        key={chip.key}
                        type="button"
                        onClick={chip.onRemove}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold hover:opacity-85 transition-opacity"
                      >
                        <span>{chip.label}</span>
                        <X className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Course Cards Grid */}
              {filteredCourses.length === 0 ? (
                <div className="rounded-2xl bg-surface-container-lowest p-space-xl text-center shadow-sm flex flex-col items-center gap-space-md">
                  <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-secondary">
                    <GraduationCap className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-1">
                      No matching courses found
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                      Try clearing some filters or searching for another technology or instructor.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="px-space-lg py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors shadow-sm"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                  {filteredCourses.map((course) => (
                    <article
                      key={course.id}
                      className="group rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      <div className="relative aspect-[16/10] w-full bg-surface-container overflow-hidden">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 45vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-md text-on-surface font-caption text-caption font-semibold">
                            {course.category}
                          </span>
                          <span
                            className={
                              course.isFree
                                ? "px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-semibold"
                                : "px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-caption text-caption font-semibold"
                            }
                          >
                            {course.modeBadge}
                          </span>
                        </div>
                        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-caption text-caption font-medium flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          {course.duration}
                        </span>
                      </div>

                      <div className="p-space-lg flex flex-col flex-1 justify-between gap-space-md">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-caption text-caption text-secondary font-semibold uppercase tracking-wide">
                              {course.level} Level
                            </span>
                            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface font-semibold">
                              <Star
                                className="w-4 h-4 text-secondary fill-secondary"
                                aria-hidden="true"
                              />
                              {course.rating}
                              <span className="font-caption text-caption text-on-surface-variant font-normal">
                                ({course.reviewsCount})
                              </span>
                            </span>
                          </div>

                          <h3 className="font-title-md text-title-md text-on-surface font-bold group-hover:text-primary-container transition-colors mb-2">
                            <Link href={course.href}>{course.title}</Link>
                          </h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                            {course.description}
                          </p>
                        </div>

                        <div className="flex flex-col gap-space-md">
                          <div className="flex items-center gap-2.5 pt-space-sm border-t border-surface-container">
                            <Image
                              src={course.instructor.avatar}
                              alt={course.instructor.name}
                              width={36}
                              height={36}
                              className="w-9 h-9 rounded-full object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
                                {course.instructor.name}
                              </p>
                              <p className="font-caption text-caption text-on-surface-variant truncate">
                                {course.instructor.role}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-space-sm">
                            <div className="flex items-baseline gap-2">
                              <span
                                className={
                                  course.isFree
                                    ? "font-headline-sm text-headline-sm text-tertiary font-bold"
                                    : "font-headline-sm text-headline-sm text-primary font-bold"
                                }
                              >
                                {course.priceFormatted}
                              </span>
                              <span className="font-caption text-caption text-outline line-through">
                                {course.originalPriceFormatted}
                              </span>
                            </div>

                            <Link
                              href={course.href}
                              className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-sm text-label-sm font-semibold transition-colors shadow-sm"
                            >
                              <span>View Details</span>
                              <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pt-space-md border-t border-surface-container">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Page <span className="font-semibold text-on-surface">{currentPage}</span> of 4
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="p-2 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container disabled:opacity-40 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  {[1, 2, 3, 4].map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "w-9 h-9 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-sm"
                          : "w-9 h-9 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container font-label-md text-label-md transition-colors"
                      }
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(4, p + 1))}
                    disabled={currentPage === 4}
                    aria-label="Next page"
                    className="p-2 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container disabled:opacity-40 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Satisfaction Guarantee Banner */}
              <section className="rounded-2xl bg-surface-container-low p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                <div className="flex items-start sm:items-center gap-space-md">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">
                      100% Satisfaction & Career Readiness Guarantee
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Every paid cohort includes lifetime 1080p recordings, live code reviews, and
                      direct career placement portfolio mentorship.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-tertiary font-label-sm text-label-sm font-semibold">
                  <Users className="w-4 h-4" aria-hidden="true" />
                  <span>45,000+ Alumni Strong</span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
