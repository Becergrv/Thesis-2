from django.shortcuts import render, redirect
from .models import Personnel, EmploymentDetails, Identification, Position
from .forms import EmployeeForm

def dashboard(request):
    try:
        # Render dashboard with additional context if needed
        return render(request, 'ui/dashboard.html')
    except Exception as e:
        # Log errors and return a generic error message
        return render(request, 'ui/error.html', {'message': f"Error: {str(e)}"})

def add_employee(request):
    if request.method == 'POST':
        form = EmployeeForm(request.POST)
        if form.is_valid():
            try:
                # Save personnel and related information
                personnel = form.save()

                # Create EmploymentDetails and Identification using clean data
                position_name = request.POST.get('position')
                position, created = Position.objects.get_or_create(position_name=position_name)
                EmploymentDetails.objects.create(
                    personnel=personnel,
                    position=position,
                    status=request.POST.get('status'),
                    date_hired=request.POST.get('date_hired'),
                    latest_evaluation=request.POST.get('latest_evaluation'),
                    basic_salary=request.POST.get('basic_salary')
                )
                Identification.objects.create(
                    personnel=personnel,
                    sss=request.POST.get('sss'),
                    philhealth=request.POST.get('philhealth'),
                    pag_ibig=request.POST.get('pag_ibig'),
                    tin=request.POST.get('tin')
                )
                return redirect('dashboard')  # Redirect after successful submission
            except Exception as e:
                return render(request, 'ui/error.html', {'message': f"Error: {str(e)}"})
    else:
        form = EmployeeForm()
    return render(request, 'ui/add_employees.html', {'form': form})
