<?php

namespace Database\Factories;

use App\Models\ApplicantFilter;
use App\Models\PoolCandidateSearchRequest;
use App\Models\Department;
use App\Models\PoolCandidateFilter;
use Illuminate\Database\Eloquent\Factories\Factory;

class PoolCandidateSearchRequestFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PoolCandidateSearchRequest::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
      return [
        'full_name' => $this->faker->name(),
        'email' => $this->faker->unique()->safeEmail,
        'department_id' => Department::inRandomOrder()->first()->id,
        'job_title' => $this->faker->jobTitle(),
        'additional_comments' => $this->faker->text(),
        'done_at' => $this->faker->optional()->dateTimeBetween($startDate = '-3 years', $endDate = 'now'),
        'admin_notes' => $this->faker->text(),
        'pool_candidate_filter_id' => PoolCandidateFilter::factory(),
        'applicant_filter_id' => ApplicantFilter::factory(),
      ];
    }
}
